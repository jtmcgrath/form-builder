import React, { Component } from 'react';
import { FormGroup, FormControl, Checkbox, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFormData } from '../actions';


class FormType extends Component {
	constructor(props){
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.saveFormElement = this.saveFormElement.bind(this)
		this.state = { formInputValue: "",
		checkbox1: false, checkbox2: true, checkbox3: false,
		selectedRadio: "option3"}
	}

	handleChange(e) {
		const target = e.target
		const name = target.name
		if (name === "radioGroup"){ this.setState({ selectedRadio: target.value })}
		const value = target.type === 'checkbox' ? target.checked : target.value
		this.setState({ [name]: value })
	}

	// saves the form element when you click off of the certain element
	saveFormElement(e) {
		this.props.updateFormData(this.props.id, this.state.formInputValue)
	}

	// literaly just made a button so if you pressed enter it wouldn't "submit"..
	preventInputSubmit(e) {
		e.preventDefault()
	}

	renderFormChoice(){
		const { formTypeChoice } = this.props;

		if (formTypeChoice === "text") {
			return (
				<div>
					<FormControl 
							type="text"
							name="formInputValue"
							value={this.state.formInputValue}
							onChange={this.handleChange}
							placeholder="Enter Text"
							onBlur={this.saveFormElement}
						/>
					<button type="submit" onClick={this.preventInputSubmit} style={{display:"none"}} />
				</div>
			)
		} else if (formTypeChoice === "textarea") {
			return (
				<div>
					<FormControl 
							type="text"
							name="formInputValue"
							componentClass="textarea"
							value={this.state.formInputValue}
							onChange={this.handleChange}
							placeholder="Enter Text"
							onBlur={this.saveFormElement}
						/>
					<button type="submit" onClick={this.preventInputSubmit} style={{display:"none"}} />
				</div>
			)
		} else if (formTypeChoice === "checkbox") {
			return (
				<div>
					<Checkbox
						inline
						name="checkbox1"
						checked={this.state.checkbox1}
						onChange={this.handleChange}>
						1
					</Checkbox>
					{' '}
					<Checkbox
						inline
						name="checkbox2"
						checked={this.state.checkbox2}
						onChange={this.handleChange}>
						2
					</Checkbox>
					{' '}
					<Checkbox
						inline
						name="checkbox3"
						checked={this.state.checkbox3}
						onChange={this.handleChange}>
						3
					</Checkbox>
				</div>
			)
		} else if (formTypeChoice === "radio") {
			return (
				<div>
					<Radio
						inline
						name="radioGroup"
						value="option1"
						checked={this.state.selectedRadio === "option1"}
						onChange={this.handleChange}>
		        1
		      </Radio>
		      {' '}
		      <Radio
		      	inline
		      	name="radioGroup"
		      	value="option2"
		      	checked={this.state.selectedRadio === "option2"}
		      	onChange={this.handleChange}>
		        2
		      </Radio>
		      {' '}
		      <Radio
		      	inline
		      	name="radioGroup"
		      	value="option3"
		      	checked={this.state.selectedRadio === "option3"}
		      	onChange={this.handleChange}>
		        3
		      </Radio>
				</div>
			)
		}
	}

	render() {
		console.log(this.props)
		return (
			<form>
				<FormGroup>
					{this.renderFormChoice()}
				</FormGroup>
			</form>
		)
	}
}

// function mapStateToProps(state){
// 	return { formObjects: state.formObjects }
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFormData }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormType);