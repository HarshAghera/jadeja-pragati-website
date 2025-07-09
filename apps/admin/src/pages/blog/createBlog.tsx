import React, { useState } from 'react';
import axios from 'axios';
// import ReactQuill from 'react-quill';

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !content || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('content', content);
    formData.append('isPublished', isPublished.toString());
    formData.append('image', image);

    try {
      setLoading(true);
      await axios.post('http://localhost:4000/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Blog created successfully!');
      // Optionally, reset fields
      setTitle('');
      setShortDescription('');
      setContent('');
      setImage(null);
      setIsPublished(false);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="border px-4 py-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <textarea
            className="border px-4 py-2 w-full rounded"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Content</label>
          {/* <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="bg-white"
          /> */}
        </div>

        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
          />
          <label className="text-sm">Publish immediately</label>
        </div>

        <button
          type="submit"
          className="bg-[#001f3f] hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
