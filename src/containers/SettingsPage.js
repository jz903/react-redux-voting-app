import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'antd'

import EditUserForm from '../components/EditUserForm'
import * as actions from '../actions/user'
import { getCurrentUser } from '../selectors'

import './SignPage.css'

class SettingsPage extends PureComponent {
  static propTypes = {
    user: object.isRequired,
    fetchUser: func.isRequired,
    editUser: func.isRequired,
  }

  componentDidMount() {
    const { fetchUser } = this.props

    fetchUser()
  }

  render() {
    const { user, editUser } = this.props

    return (
      <div className="settings page container">
        <Card
          title="Edit the profile"
          className="box-card"
        >
          <EditUserForm
            user={user}
            editUser={editUser}
          />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  votes: state.entities.votes,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(actions.fetchUser())
  },
  editUser: data => {
    dispatch(actions.editUser(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
