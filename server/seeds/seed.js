// server/seeds/seed.js
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Email = require("../models/emailModel");
require("../config/connectToDb"); // Your database connection

const users = [
  {
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
  },
  {
    email: "jane@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
  },
  {
    email: "bob@example.com",
    password: "password123",
    firstName: "Bob",
    lastName: "Johnson",
  },
  {
    email: "alice@example.com",
    password: "password123",
    firstName: "Alice",
    lastName: "Brown",
  },
  {
    email: "charlie@example.com",
    password: "password123",
    firstName: "Charlie",
    lastName: "Wilson",
  },
];

const generateEmails = (userIds) => {
  const emails = [];
  const conversations = [
    {
      subject: "Project Meeting",
      body: "Can we schedule a meeting to discuss the project progress?",
    },
    {
      subject: "Lunch Plans",
      body: "Would you like to grab lunch tomorrow at 12:30?",
    },
    {
      subject: "Report Review",
      body: "Please review the attached quarterly report when you get a chance.",
    },
    {
      subject: "Weekend Plans",
      body: "Are you free this weekend? We're planning a team building event.",
    },
    {
      subject: "Client Presentation",
      body: "Here's the draft for next week's client presentation. Need your feedback.",
    },
  ];

  // Generate emails between users
  userIds.forEach((senderId) => {
    userIds.forEach((recipientId) => {
      if (senderId !== recipientId) {
        // Generate 2-3 emails per sender-recipient pair
        const numEmails = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < numEmails; i++) {
          const conversation =
            conversations[Math.floor(Math.random() * conversations.length)];
          emails.push({
            sender: senderId,
            recipients: [recipientId],
            subject: `Re: ${conversation.subject}`,
            body: `${conversation.body}\n\nBest regards`,
            isRead: Math.random() > 0.5,
          });
        }
      }
    });
  });

  // Add some group emails
  for (let i = 0; i < 3; i++) {
    const sender = userIds[Math.floor(Math.random() * userIds.length)];
    const recipients = userIds.filter((id) => id !== sender).slice(0, 3);
    emails.push({
      sender,
      recipients,
      subject: "Team Update",
      body: "Here's the latest update on our team progress...",
      isRead: Math.random() > 0.5,
    });
  }

  return emails;
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Email.deleteMany({});

    // Create users
    const createdUsers = await User.create(users);
    const userIds = createdUsers.map((user) => user._id);

    // Generate and create emails
    const emails = generateEmails(userIds);
    await Email.create(emails);

    console.log("Database seeded successfully!");
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${emails.length} emails`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
