import React from 'react'
import { useState } from 'react'

function Attachments() {
    const[file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const uploadFile = async () => {
        if (!file) {
          alert('Please select a file first!');
          return;
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64 = reader.result.split(',')[1];
          try {
            const response = await fetch('/your-firebase-function-url/uploadImage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ blob: base64 }),
            });
            if (response.ok) {
              const data = await response.json();
              console.log('Upload successful:', data);
              alert('Upload successful!');
            } else {
              alert('Upload failed!');
            }
          } catch (error) {
            console.error('Error uploading file:', error);
            alert('Upload failed!');
          }
        };
        reader.onerror = (error) => {
          console.error('Error converting file to base64:', error);
          alert('Could not read file.');
        };
      };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
  )
}


export default Attachments