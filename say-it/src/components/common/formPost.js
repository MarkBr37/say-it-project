import {Component} from "react";
import Joi from "joi";

class FormPost extends Component{

    state = {
        data: {},
        errors: {},
    }

    validate = () => {
       
        const { error } = Joi.object(this.schema).validate(this.state.data);
        
        if(!error) return null;

        return { post: error.details[0].message};
    }

    validateProperty = ({name, value}) => {
        if(!name) return null;
        if(!this.schema[name]) return null;

        const { error } = Joi.object({[name]: this.schema[name]}).validate({[name]: value});

        return error ? error.details[0].message : null
    }

    handleInputChange = ({currentTarget}) => {
        const {data, errors} =  this.state;
        const errorMessage = this.validateProperty(currentTarget);

        if(errorMessage) errors[currentTarget.name] = errorMessage;
        else delete errors[currentTarget.name];

        data[currentTarget.name] = currentTarget.value;

        this.setState({data, errors});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors != null ? errors : {}})

        if(errors) return;
        this.doSubmit();
    }


}

export default FormPost;