import PropTypes from 'prop-types';

export const ConversationPropType = PropTypes.shape({
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      conversationId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isSent: PropTypes.bool.isRequired,
      sender: PropTypes.string.isRequired,
    }),
  ),
  createdAt: PropTypes.string.isRequired,
  gigId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    cognitoId: PropTypes.string.isRequired,
    registered: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }),
});

export default PropTypes.objectOf(ConversationPropType.isRequired);
