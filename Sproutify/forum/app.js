const upvotes = document.getElementsByClassName('upvote');
const votess = document.getElementsByClassName('votess');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const month = monthNames[date.getMonth()];


// Untuk vote button
for (let i = 0; i < upvotes.length; i++) {
    let voted = false;

    upvotes[i].addEventListener('click', () => {
        let currentVotes = parseInt(votess[i].innerText);

        if (!voted) {
            currentVotes += 1;
            votess[i].innerText = currentVotes + " votes";
            voted = true;
            upvotes[i].innerText = "Upvoted";
        } else {
            currentVotes -= 1;
            votess[i].innerText = currentVotes + " votes";
            voted = false;
            upvotes[i].innerText = "Upvote";
        }
    });
}

// Fungsi untuk menambahkan jawaban baru
function addNewAnswer(answerText) {
    const answersDiv = document.getElementById('answers');
    const newAnswer = document.createElement('div');
    newAnswer.classList.add('mb-3');
    
    // Set up inner HTML for the new answer
    newAnswer.innerHTML = `
    <div class="answer card mb-4 anim">
    <div class="card-body">
        <p class="answer-text">${answerText}</p>
        <p class="text-muted">Dijawab oleh <strong>Anda</strong> pada <em>${date.getDate()} ${month} ${date.getFullYear()}</em></p>
        <div class="answer-meta">
            <button class="upvote btn btn-outline-success btn-sm">Upvote</button>
            <span class="votess badge badge-secondary ml-2">0 votes</span>
            <button class="btn btn-link reply-btn">Reply</button>
        </div>
        <div class="reply-section mt-2" style="display: none;">
            <textarea class="form-control mb-2" rows="2" placeholder="Add Replies..."></textarea>
            <button class="btn btn-primary btn-sm submit-reply">Submit</button>
        </div>
        <div class="replies mt-3"></div>
    </div>
</div>
    `;

    // Append the new answer to the answers div
    answersDiv.appendChild(newAnswer);
    
    // Attach voting and reply events to the new answer
    attachVoteEvents(newAnswer);
    attachReplyEvents(newAnswer);
}
// Fungsi untuk mengaitkan event voting
function attachVoteEvents(answerElement) {
    let voted = false; // Track if the user has voted

    const upvoteButton = answerElement.querySelector('.upvote');
    const voteCount = answerElement.querySelector('.votess');

    upvoteButton.addEventListener('click', () => {
        let currentVotes = parseInt(voteCount.innerText);

        if (!voted) {
            currentVotes += 1;
            voteCount.innerText = currentVotes + " votes";
            voted = true;
            upvoteButton.innerText = "Upvoted";
        } else {
            currentVotes -= 1;
            voteCount.innerText = currentVotes + " votes";
            voted = false;
            upvoteButton.innerText = "Upvote";
        }
    });
}

// Fungsi untuk mengaitkan event balasan
function attachReplyEvents(answerElement) {
    // Implementasikan logika untuk balasan di sini
}

        // Fungsi untuk menambahkan balasan pada jawaban
        function addReply(answerElement, replyText) {
            const repliesDiv = answerElement.querySelector('.replies');
            const newReply = document.createElement('div');
            newReply.classList.add('reply-line');
            newReply.innerHTML = `
                <p>${replyText}</p>
                <p class="text-muted">Dibalas oleh <strong>Anda</strong> pada <em>${date.getDate()} ${month} ${date.getFullYear()}</em></p>
                <button class="btn btn-link reply-btn">Reply</button>
                <div class="reply-section mt-2" style="display: none;">
                    <textarea class="form-control mb-2" rows="2" placeholder="Tulis balasan..."></textarea>
                    <button class="btn btn-primary btn-sm submit-reply">Submit</button>
                </div>
                <div class="replies mt-3"></div>
            `;
            repliesDiv.appendChild(newReply);
            attachReplyEvents(newReply);
        }

        // Fungsi untuk menambahkan event listener pada tombol reply dan submit
        function attachReplyEvents(answerElement) {
            const replyButton = answerElement.querySelector('.reply-btn');
            const replySection = answerElement.querySelector('.reply-section');
            const submitReplyButton = answerElement.querySelector('.submit-reply');

            replyButton.addEventListener('click', function() {
                replySection.style.display = (replySection.style.display === 'none' || replySection.style.display === '') ? 'block' : 'none';
            });

            submitReplyButton.addEventListener('click', function() {
                const replyText = replySection.querySelector('textarea').value.trim();
                if (replyText === '') {
                    alert('Silakan tulis balasan Anda terlebih dahulu.');
                    return;
                }
                addReply(answerElement, replyText);
                replySection.querySelector('textarea').value = ''; // Kosongkan textarea
                replySection.style.display = 'none'; // Sembunyikan reply section
            });
        }

        // Event listener untuk submit jawaban baru
        document.getElementById('submitAnswer').addEventListener('click', function() {
            const answerInput = document.getElementById('answerInput');
            const answerText = answerInput.value.trim();
            if (answerText === '') {
                alert('Silakan tulis jawaban Anda terlebih dahulu.');
                return;
            }
            addNewAnswer(answerText);
            answerInput.value = ''; // Kosongkan textarea
        });

        // Inisialisasi event listener untuk jawaban yang sudah ada
        document.querySelectorAll('.reply-section').forEach(function(section) {
            const answerElement = section.closest('.card');
            attachReplyEvents(answerElement);
        });