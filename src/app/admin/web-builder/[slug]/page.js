import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ReactDraggable from 'react-draggable';
import Block from '../components/Block';
import { blocks } from '../components/blocks';

const PageBuilder = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(null);

  useEffect(() => {
    // Fetch page data by slug if needed
  }, [slug]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'blocksPalette' && destination.droppableId === 'previewArea') {
      const blockId = result.draggableId;
      const block = blocks.flatMap(section => section.content).find(item => item.id === blockId);

      if (block) {
        const newPreviewBlocks = [...previewBlocks, { ...block, instanceId: new Date().getTime() }];
        setPreviewBlocks(newPreviewBlocks);
      }
    } else if (source.droppableId === 'previewArea' && destination.droppableId === 'previewArea') {
      const newPreviewBlocks = Array.from(previewBlocks);
      const [movedBlock] = newPreviewBlocks.splice(source.index, 1);
      newPreviewBlocks.splice(destination.index, 0, movedBlock);
      setPreviewBlocks(newPreviewBlocks);
    }
  };

  const deleteBlock = (instanceId) => {
    setPreviewBlocks(previewBlocks.filter(block => block.instanceId !== instanceId));
  };

  const updateBlock = (updatedBlock) => {
    const newPreviewBlocks = [...previewBlocks];
    newPreviewBlocks[currentBlockIndex] = updatedBlock;
    setPreviewBlocks(newPreviewBlocks);
  };

  const handleEditClick = (block, index) => {
    setCurrentBlock(block);
    setCurrentBlockIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentBlock(null);
    setCurrentBlockIndex(null);
  };

  const handleSave = (block) => {
    updateBlock(block);
    handleModalClose();
  };

  const generateHTML = (blocks) => {
    return blocks.map(block => {
      return `<div class="block">
                <img src="${block.image}" alt="Block Image" class="block-image" />
                <div class="block-content">${block.content}</div>
              </div>`;
    }).join('');
  };

  const handleExport = () => {
    const htmlContent = generateHTML(previewBlocks);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported_blocks.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const savePage = async (status) => {
    const pageData = {
      blocks: previewBlocks,
      status,
    };

    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      toast.success(`Page ${status} successfully!`);
      console.log(`Page ${status} successfully:`, data);
    } catch (error) {
      toast.error(`Failed to save page: ${error.message}`);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between p-4">
        <div className="flex flex-col w-72 mr-4">
          <Droppable droppableId="blocksPalette">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`bg-gray-200 p-4 rounded ${isModalOpen ? 'flex-grow-0' : 'flex-grow'}`}
              >
                <h2 className="text-lg font-semibold mb-4 text-indigo-500">Blocks Palette</h2>
                {blocks.map((section) => (
                  <React.Fragment key={section.id}>
                    <div className="mb-2 text-sm font-semibold text-gray-600">{section.name}</div>
                    {section.content.map((block, index) => (
                      <Draggable key={block.id} draggableId={block.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 cursor-pointer flex items-center"
                          >
                            <img src={block.image} alt={`Block ${index + 1}`} className="w-18 h-18 rounded-lg" />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </React.Fragment>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <Droppable droppableId="previewArea">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-gray-100 p-4 rounded w-full"
            >
              <h2 className="text-lg font-semibold mb-4 text-indigo-500">Preview Area</h2>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleExport}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Export
                </button>
                <button
                  onClick={() => savePage('draft')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => savePage('published')}
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                >
                  Publish
                </button>
              </div>
              {previewBlocks.map((block, index) => (
                <Draggable key={block.instanceId} draggableId={block.instanceId.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded p-4 mb-4 shadow bg-white"
                    >
                      <Block block={block} />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => deleteBlock(block.instanceId)}
                          className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditClick(block, index)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {isModalOpen && (
          <ReactDraggable handle=".draggable-handle">
            <div className="bg-gray-200 p-4 rounded w-64 h-screen fixed bottom-0  my-1 left-4 z-10">
              <div className="draggable-handle bg-gray-300 p-2 cursor-move rounded mb-4">
                <h2 className="text-lg font-semibold text-black">Edit Block</h2>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Content</label>
                <textarea
                  value={currentBlock.content}
                  onChange={(e) => setCurrentBlock({ ...currentBlock, content: e.target.value })}
                  className="w-full h-96	p-2 border rounded text-black"
                  rows="4"
                />
              </div>
              <div className="flex justify-end bottom-0 ">
                <button onClick={handleModalClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                  Cancel
                </button>
                <button onClick={() => handleSave(currentBlock)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </div>
          </ReactDraggable>
        )}
      </div>
    </DragDropContext>
  );
};

export default PageBuilder;
