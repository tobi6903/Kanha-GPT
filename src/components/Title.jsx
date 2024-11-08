import React from "react";
import krish from "../assets/images/krish1.png";
const Title = () => {
	return (
		<div className="title">
			
			<h2>
			<img className="loading-images"
			src={krish}
			alt="musical notes" height={200} width={300}/>
			</h2>
			<br />
			<h1>Kanha GPT 🦚</h1>
		</div>
	);
};

export default Title;
