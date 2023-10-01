import React, { useState } from 'react'
import placeholderImage from '../../../assets/app_images/placeholder.png'
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { BsUpload } from "react-icons/bs";
import Swal from 'sweetalert2'

const UploadImagePanelContainer = ({ showUploadImagePanel, setShowUploadImagePanel, closeAllPanels}) => {

	const [imgUrl, setImgUrl] = useState(null);
  	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false)
	const hostname = window.location.hostname;
	

	const doNothing = () => {}

	const handleImageUploadRequest = () => {
		document.getElementById("file-upload").click()
	}

	const uploadImage = async (e) => {
		const files = e.target.files;
		let filename = files[0].name;

		if(filename.lastIndexOf(".") <=  0) {
			closeAllPanels()
			Swal.fire({
				icon: 'error',
				title: 'Image Upload Failed!',
				text: 'Please select a valid file type.',
			})
			return null;
		}

		const fileReader = new FileReader()
		fileReader.addEventListener('load', () => {
			setImgUrl(fileReader.result)
		})
		fileReader.readAsDataURL(files[0])
		setLoading(true)

		let formData = new FormData();
		formData.append("file", files[0]);
		const options = {
			method: "POST",
			body: formData
		}

		const response = await fetch(`http://${hostname}:8000/image-upload-services`, options);
    	const data = await response.json();

		console.log(data.data.imgUrl)
		setLoading(false)
		closeAllPanels()
	}
  
	return (
		<div className='toolbox-option-menu-panel-container'>
			<div className='image-upload-container'>
				<h3 className='h5 container-title'>Upload Image</h3>
				<p className='upload-instruction'>Only .png, .jpg, .gif allowed. Max 5 MB. You can also drag and drop.</p>
				<div className="mb-3 text-center">
					<img src={imgUrl ? imgUrl : placeholderImage} alt="sample" className='placeholder-img' style={{ height: "150px", width: "200px", margin: "0 30px" }} />
				</div>
				<div className="mb-3">
					<input id="file-upload" className="form-control" accept="image/*" type="file" onChange={(e)=>uploadImage(e)} hidden />
				</div>
				<div className="mb-5 text-center">
					{ loading ? 
						<button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={50} /></button> :
						<button type="button" onClick={handleImageUploadRequest} className="btn btn-primary"><BsUpload /> &nbsp;Upload Image</button>
					}
				</div>
			</div>
		</div>
	)
}

export default UploadImagePanelContainer
