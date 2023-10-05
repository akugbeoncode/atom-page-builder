import React, { useState } from 'react'
import placeholderImage from '../../../assets/app_images/placeholder.png'
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { BsUpload } from "react-icons/bs";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { getUiElementDefaultSettings } from '../../../apis/defaults';
import { createPageElement } from '../../../apis/pageElements';

const UploadImagePanelContainer = ({ closeAllPanels, page, updatePageElementsCallback}) => {

	const [imgUrl, setImgUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	

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
		formData.append("upload_preset", "atom-page-builder");
		const options = {
			method: "POST",
			body: formData
		}

		const response = await fetch(`https://api.cloudinary.com/v1_1/akrosoft/upload`, options);
    	const data = await response.json();
		const type = "image"

		const imageUIElement = {
			reference: uuidv4(),
			page: page.reference,
			type: type,
			url: data.secure_url,
			settings: getUiElementDefaultSettings(type)
		}

		// imageUIElement.settings.height = data.height
		// imageUIElement.settings.width = data.widthimageUIElement.settings.height = data.height
		// imageUIElement.settings.width = data.width

		const aspectRatio = data.width/data.height;

		let imgHeight = 0;
		let imgWidth = 0;

		if ((data.width > 200) && (data.height > 200)) {
			if (data.width > data.height) {
				imgWidth = 200;
				imgHeight = parseInt(200 * aspectRatio, 10)
			} else {
				imgHeight = 200;
				imgWidth = parseInt(200 * aspectRatio, 10)
			}
		} else if ((data.width > 200) && (data.height < 200)) {
			imgWidth = 200;
			imgHeight = parseInt(200 * aspectRatio, 10)
		} else if ((data.width < 200) && (data.height > 200)) {
			imgHeight = 200;
			imgWidth = parseInt(200 * aspectRatio, 10)
		} else {
			imgHeight = data.height
			imgWidth = data.width;
		}

		imageUIElement.settings.height = imgHeight;
		imageUIElement.settings.width = imgWidth;

		await createPageElement(imageUIElement)
		setLoading(false)
		closeAllPanels()
		updatePageElementsCallback()
		
	}
  
	return (
		<div className='toolbox-option-menu-panel-container'>
			<div className='image-upload-container'>
				<h3 className='h5 container-title'>Upload Image</h3>
				<p className='upload-instruction'>Only .png, .jpg, .gif allowed. Max 5 MB. You can also drag and drop.</p>
				<div className="mb-3 text-center">
					<img src={imgUrl ? imgUrl : placeholderImage} alt="sample" className='placeholder-img' style={{ height: "100px", margin: "0 30px" }} />
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
