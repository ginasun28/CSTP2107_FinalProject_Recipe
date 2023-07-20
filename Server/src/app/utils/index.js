// treeUtils.js

// Encapsulate utility functions for constructing tree structures
function buildTree(comments, parentCommentId = null) {
    const tree = [];
    for (const comment of comments) {
        if (comment.parentCommentId === parentCommentId) {
            const node = {
                ...comment,
                children: buildTree(comments, comment.id),
            };
            tree.push(node);
        }
    }
    return tree;
}

function sortCommentsByTime(commentsArray) {
    commentsArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    commentsArray.forEach((comment) => {
        if (comment.children.length) {
            sortCommentsByTime(comment.children);
        }
    });
    return commentsArray
}

module.exports = {
    buildTree, sortCommentsByTime
};
