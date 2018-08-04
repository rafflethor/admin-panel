import React from 'react';
import { BaseForm} from 'react-validify'

export default class Form extends React.Component {

    constructor({ values = {}, errors = {} }) {
        super();
        this.state = { values, errors };
    }

    handleOnValues (values, callback) {
        this.setState({ values })

        if (callback) {
            callback(values)
        }
    }

    render() {
        let { values, errors } = this.state;
        let { children, onValues,...props } = this.props;

        return (
            <BaseForm
                {...props}
                values={this.props.values || values}
                errors={this.props.errors || errors}
                onValues={values => this.handleOnValues(values, onValues)}
                onErrors={errors => this.setState({ errors })}
                >
                {children}
            </BaseForm>
        );
    }
}
