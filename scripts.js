function initializeComments() {
    const storedComments = localStorage.getItem('commentsData');
    return storedComments ? JSON.parse(storedComments) : {};
}

const commentsData = initializeComments();

function submitComment(podcastId) {
    const commentInput = document.getElementById(`comment-podcast1`);
    const commentText = commentInput.value.trim();

    if (commentText) {
        if (!commentsData[podcastId]) {
            commentsData[podcastId] = [];
        }

        commentsData[podcastId].push(commentText);
        localStorage.setItem('commentsData', JSON.stringify(commentsData));
        updateCommentsUI(podcastId);
        commentInput.value = '';
    } else {
        alert("请输入有效的评论！");
    }
}

function updateCommentsUI(podcastId) {
    const commentsList = document.getElementById(`comments-list-podcast1`);
    commentsList.innerHTML = '';

    if (commentsData[podcastId]) {
        commentsData[podcastId].forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
        });
    }
}

function loadAllComments() {
    for (const podcastId in commentsData) {
        updateCommentsUI(podcastId);
    }
}

document.addEventListener('DOMContentLoaded', loadAllComments);