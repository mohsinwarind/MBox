document.addEventListener('DOMContentLoaded', function () {
  // Button events
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Form submit
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // Load inbox by default
  load_mailbox('inbox');
});

function compose_email() {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function send_email(event) {
  event.preventDefault();

  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({ recipients, subject, body }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.message === "Email sent successfully.") {
        load_mailbox('sent');
        show_popup_message("Email sent successfully!");
      } else {
        show_popup_message(result.error || "Something went wrong.");
      }
    })
    .catch(() => show_popup_message("An unexpected error occurred."));
}

function load_mailbox(mailbox) {
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'block';

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      const emailsView = document.querySelector('#emails-view');
      emailsView.innerHTML = `<h3 class="mb-4 text-capitalize">${mailbox}</h3>`;

      emails.forEach(email => {
        const item = document.createElement('div');
        item.className = 'email-item';
        if (email.read) item.classList.add('read');

        item.innerHTML = `
          <div class="d-flex justify-content-between">
            <strong>${mailbox === 'sent' ? `To: ${email.recipients.join(', ')}` : `From: ${email.sender}`}</strong>
            <span class="text-muted">${email.timestamp}</span>
          </div>
          <div>${email.subject}</div>
        `;

        item.addEventListener('click', () => {
          load_email(email.id);
          item.classList.add('read');
        });

        emailsView.appendChild(item);
      });
    });
}

function load_email(id) {
  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {
      const view = document.querySelector('#emails-view');
      view.innerHTML = '';

      const container = document.createElement('div');
      container.className = 'email-details';

      container.innerHTML = `
        <h4>${email.subject}</h4>
        <p><strong>From:</strong> ${email.sender}</p>
        <p><strong>To:</strong> ${email.recipients.join(', ')}</p>
        <p><strong>Timestamp:</strong> ${email.timestamp}</p>
        <hr>
        <p style="white-space: pre-line;">${email.body}</p>
      `;

      const controls = document.createElement('div');
      controls.className = 'mt-3';

      if (email.sender !== document.querySelector('h2').innerText.trim()) {
        const archiveButton = document.createElement('button');
        archiveButton.className = 'btn btn-sm btn-outline-secondary me-2';
        archiveButton.innerText = email.archived ? 'Unarchive' : 'Archive';
        archiveButton.addEventListener('click', () => {
          fetch(`/emails/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ archived: !email.archived }),
          }).then(() => {
            load_mailbox('archive');
            show_popup_message(email.archived ? 'Email unarchived!' : 'Email archived!');
          });
        });
        controls.appendChild(archiveButton);
      }

      const replyButton = document.createElement('button');
      replyButton.className = 'btn btn-sm btn-dark';
      replyButton.innerText = 'Reply';
      replyButton.addEventListener('click', () => {
        reply_email(email);
        show_popup_message("Reply initiated!");
      });

      controls.appendChild(replyButton);
      container.appendChild(controls);
      view.appendChild(container);

      if (!email.read) {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ read: true }),
        });
      }
    });
}

function reply_email(email) {
  compose_email();

  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value =
    email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`;
  document.querySelector('#compose-body').value =
    `\n\n\n---------------------------------------------\nOn ${email.timestamp}, ${email.sender} wrote:\n${email.body}`;
}

function show_popup_message(message) {
  const popup = document.getElementById('popup-message');
  popup.innerText = message;
  popup.style.display = 'block';
  setTimeout(() => popup.style.display = 'none', 3000);
}
