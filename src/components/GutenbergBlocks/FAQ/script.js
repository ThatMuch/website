import {
AlignmentToolbar,
BlockControls,
ColorPalette,
InspectorControls,
RichText,
useBlockProps,
} from "@wordpress/block-editor";
import React, { useState } from "react";

import { PanelBody } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const defaultConfig = window.faqBlockConfig || {};

const FAQBlock = (props) => {
const { attributes, setAttributes, className } = props;
const [focus, setFocus] = useState(false);

// Set default attributes if not set
React.useEffect(() => {
	if (!attributes.backgroundColor)
		setAttributes({ backgroundColor: defaultConfig.backgroundColor });
	if (!attributes.questionText)
		setAttributes({ questionText: defaultConfig.questionTextColor });
	if (!attributes.questionBg)
		setAttributes({ questionBg: defaultConfig.questionBackgroundColor });
	if (!attributes.answerText)
		setAttributes({ answerText: defaultConfig.answerTextColor });
	if (!attributes.answerBg)
		setAttributes({ answerBg: defaultConfig.answerBackgroundColor });
	// eslint-disable-next-line
}, []);

const blockProps = useBlockProps();

const handleQuestionClick = (e) => {
	const t = e.target.closest(".question");
	if (t) {
		const n = t.parentNode.querySelector(".answer");
		if (n) {
			const r = n.classList || [];
			if (
				r.length > 0 &&
				(r.contains("editor-rich-text") ||
					r.contains("block-editor-rich-text__editable"))
			) {
				if (r.contains("edit-answer")) {
					r.remove("edit-answer");
					t.classList.remove("active");
				} else {
					r.add("edit-answer");
					t.classList.add("active");
				}
			}
		}
	}
};

// Dummy clone and remove handlers (replace with your logic)
const handleClone = (e) => {
	e.preventDefault();
	// Implement clone logic here
};
const handleRemove = (e) => {
	e.preventDefault();
	// Implement remove logic here
};

return (
	<div {...blockProps}>
		<BlockControls>
			<AlignmentToolbar
				value={attributes.alignment}
				onChange={(alignment) => setAttributes({ alignment })}
			/>
		</BlockControls>
		<InspectorControls>
			<PanelBody
				title={__("Background color", "faq-block-for-gutenberg")}
				initialOpen={true}
			>
				<ColorPalette
					value={attributes.backgroundColor}
					onChange={(backgroundColor) => setAttributes({ backgroundColor })}
				/>
			</PanelBody>
			<PanelBody
				title={__("Question Font Color", "faq-block-for-gutenberg")}
				initialOpen={false}
			>
				<ColorPalette
					colors={["#F00"]}
					value={attributes.questionText}
					onChange={(questionText) => setAttributes({ questionText })}
				/>
			</PanelBody>
			<PanelBody
				title={__("Question Background", "faq-block-for-gutenberg")}
				initialOpen={false}
			>
				<ColorPalette
					colors={["#000"]}
					value={attributes.questionBg}
					onChange={(questionBg) => setAttributes({ questionBg })}
				/>
			</PanelBody>
			<PanelBody
				title={__("Answer Font Color", "faq-block-for-gutenberg")}
				initialOpen={false}
			>
				<ColorPalette
					colors={["#F00"]}
					value={attributes.answerText}
					onChange={(answerText) => setAttributes({ answerText })}
				/>
			</PanelBody>
			<PanelBody
				title={__("Answer Background", "faq-block-for-gutenberg")}
				initialOpen={false}
			>
				<ColorPalette
					colors={["#000"]}
					value={attributes.answerBg}
					onChange={(answerBg) => setAttributes({ answerBg })}
				/>
			</PanelBody>
		</InspectorControls>
		<div
			className={className}
			style={{ background: attributes.backgroundColor }}
			onClick={handleQuestionClick}
		>
			<RichText
				allowedFormats={["core/bold", "core/italic"]}
				tagName="div"
				className="question"
				placeholder={__("Question:", "faq-block-for-gutenberg")}
				value={attributes.question}
				onChange={(question) => setAttributes({ question })}
				onFocus={() => setFocus("question")}
				style={{
					background: attributes.questionBg,
					color: attributes.questionText,
					textAlign: attributes.alignment,
				}}
			/>
			<RichText
				tagName="div"
				className="answer"
				placeholder={__("Answer:", "faq-block-for-gutenberg")}
				value={attributes.answer}
				onChange={(answer) => setAttributes({ answer })}
				onFocus={() => setFocus("answer")}
				style={{
					background: attributes.answerBg,
					color: attributes.answerText,
					textAlign: attributes.alignment,
				}}
			/>
		</div>
		<div className="faq-block-action-button">
			<a
				href=""
				className="faq-block-action-clone"
				onClick={handleClone}
			>
				{__("Click to clone", "faq-block-for-gutenberg")}
			</a>
			<a
				href=""
				className="faq-block-action-remove"
				onClick={handleRemove}
			>
				{__("Remove", "faq-block-for-gutenberg")}
			</a>
		</div>
	</div>
);
};

export default FAQBlock;
