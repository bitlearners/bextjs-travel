'use client';
import React, { useState, useEffect  } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ReactDraggable from 'react-draggable';
import { blocks } from './components/blocks';
import Block from './components/Block';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


const WebPageBuilder = (props) => {
  

  let slug = props.params.slug;
  
  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(null);
  const router = useRouter();

console.log(slug);

  useEffect(() => {
    const checkSlug = async () => {
      try {
        const response = await fetch(`/api/pages/allpages/${slug}`);
        if (response.status === 200) {
          const data = await response.json();
          if (data.success) {
            // If you want to do something with the data when slug is valid
            // console.log('Slug is valid:', data);
          } else {
            router.push('/admin');
          }
        } else {
          router.push('/admin');
        }
      } catch (error) {
        // console.error('Error checking slug:', error);
        router.push('/');
      }
    };

    checkSlug();
  }, [slug, router]);



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
                
                <div class="block-content">${block.content}</div>
              </div>`;
    }).join('');
  };

  const handleCancel = async () => {
    router.push("/admin/pages");
  }


  const handleExport = async () => {
    const htmlContent = generateHTML(previewBlocks);

    try {
      const response = await fetch(`/api/pages/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: htmlContent, status:"Published" }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // console.log('Content updated successfully:', result.result);
          toast.success('Content updated successfully');
          router.push("/admin/pages");

        } else {
          // console.error('Error updating content:', result.message);
          toast.error('Error updating content: ' + result.message);

        }
      } else {
        // console.error('Error updating content: HTTP status', response.status);
        toast.error('Error updating content: HTTP status ' + response.status);

      }
    } catch (error) {
      // console.error('Error updating content:', error);
      toast.error('Error updating content:', error);
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
              <div className="flex justify-end mb-4 ">
                <button
                  onClick={handleExport}
                  className="bg-green-500 text-white mx-2 px-4 py-2 rounded"
                >
                  Update and Publish
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white mx-2 px-4 py-2 rounded"
                >
                  Cancel
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
            <div className="bg-gray-200 p-4 rounded w-72 h-screen fixed bottom-4 left-4 z-10">
              <div className="draggable-handle bg-gray-300 p-2 cursor-move rounded mb-4">
                <h2 className="text-lg font-semibold text-black">Edit Block</h2>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-black">Content</label>
                <textarea
                  value={currentBlock.content}
                  onChange={(e) => setCurrentBlock({ ...currentBlock, content: e.target.value })}
                  className="w-full p-2 h-96 border rounded text-black"
                  rows="4"
                />
              </div>
              <div className="flex justify-end">
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

export default WebPageBuilder;