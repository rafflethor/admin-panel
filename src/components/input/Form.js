import React from 'react';
import { BaseForm} from 'react-validify'

export default class Form extends React.Component {

    constructor({ values = {}, errors = {} }) {
        super();
        this.state = { values, errors };
    }

    render() {
        let { values, errors } = this.state;
        let { children,...props } = this.props;

        return (
            <BaseForm
                {...props}
                values={this.props.values || values}
                errors={this.props.errors || errors}
                onValues={values => this.setState({ values })}
                onErrors={errors => this.setState({ errors })}
                >
                {children}
            </BaseForm>
        );
    }
}
