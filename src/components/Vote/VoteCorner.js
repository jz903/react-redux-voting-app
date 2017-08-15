import React from 'react'
import { bool, func } from 'prop-types'
import { Modal, Button } from 'antd'

const showConfirm = onDelete => {
  Modal.confirm({
    title: 'Do you really want to delete this vote?',
    content: 'This vote will be permanently removed.',
    okText: 'Delete',
    cancelText: 'Cancel',
    iconType: 'exclamation-circle',
    onOk() {
      onDelete()
    },
  })
}

const VoteCorner = ({
  showDelete,
  onDelete,
}) => (
  <Button.Group>
    {showDelete &&
    <Button
      icon="delete"
      onClick={e => {
        e.preventDefault()
        showConfirm(onDelete)
      }}
    />}
    <Button icon="share-alt" />
  </Button.Group>
)

VoteCorner.propTypes = {
  showDelete: bool,
  onDelete: func,
}

VoteCorner.defaultProps = {
  showDelete: false,
  onDelete: () => {},
}

export default VoteCorner
