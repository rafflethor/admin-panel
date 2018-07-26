import React from 'react'
import { Button, Input, Form } from '../../components/input'

const VALIDATION_RULES = {
    username: 'required|min:5',
    password: 'required|min:5'
}

/**
 * Renders a login form
 *
 * @since 0.1.0
 */
export class LoginForm extends React.Component {

    /**
     * Handles form submit once the validation has been passed
     * successfully
     *
     * @param formValue a map with values gathered from form
     * @since 0.1.0
     */
    handleLogin (values) {
        this.props.onSubmit(values)
    }

    render () {
        return (
            <Form rules={VALIDATION_RULES}>
                <Input type="text" name="username" label="Username" />
                <Input type="password" name="password" label="Password" />
                <Button submit
                        className="btn btn-primary btn-flat m-b-30 m-t-30"
                        value="Sign in"
                        onValues={(values) => this.handleLogin(values)}/>
            </Form>
        )
    }
}
