import React from 'react'
import { object, func } from 'prop-types'
import { Modal, Button, Popover } from 'antd'

import ShareButtons from '../ShareButtons'

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
  onDelete,
  vote,
}) => {
  const { protocol, host } = window.location
  const voteUrl = `${protocol}//${host}/vote/${vote.id}`
  const showDelete = vote.isOwner

  return (
    <Button.Group>
      {showDelete &&
      <Button
        icon="delete"
        onClick={e => {
          e.preventDefault()
          showConfirm(onDelete)
        }}
      />}
      <Popover content={<ShareButtons title={vote.title} shareUrl={voteUrl} />} trigger="click">
        <Button icon="share-alt" />
      </Popover>
    </Button.Group>
  )
}

VoteCorner.propTypes = {
  vote: object,
  onDelete: func,
}

VoteCorner.defaultProps = {
  vote: {},
  onDelete: () => {},
}

export default VoteCorner
