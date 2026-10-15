const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "studentDB";

async function main() {
    try {
        await client.connect();

        console.log("Connected to MongoDB successfully!");

        const db = client.db(dbName);
        const collection = db.collection("students");

        const students = [
            {
                studentId: 101,
                name: "Arjun",
                department: "CSE",
                subjects: [
                    { subject: "DBMS", marks: 85, grade: "A" },
                    { subject: "AI", marks: 90, grade: "A+" },
                    { subject: "Web Development", marks: 78, grade: "B+" }
                ]
            },

            {
                studentId: 102,
                name: "Rohan",
                department: "CSE",
                subjects: [
                    { subject: "DBMS", marks: 75, grade: "B+" },
                    { subject: "AI", marks: 82, grade: "A" },
                    { subject: "Web Development", marks: 88, grade: "A" }
                ]
            },

            {
                studentId: 103,
                name: "Sneha",
                department: "AIML",
                subjects: [
                    { subject: "DBMS", marks: 92, grade: "A+" },
                    { subject: "AI", marks: 95, grade: "A+" },
                    { subject: "Web Development", marks: 89, grade: "A" }
                ]
            },

            {
                studentId: 104,
                name: "Varun",
                department: "AIML",
                subjects: [
                    { subject: "DBMS", marks: 68, grade: "B" },
                    { subject: "AI", marks: 74, grade: "B+" },
                    { subject: "Web Development", marks: 80, grade: "A" }
                ]
            }
        ];

        await collection.deleteMany({});

        await collection.insertMany(students);

        console.log("Student records inserted successfully!");

        const result = await collection.aggregate([
            {
                $unwind: "$subjects"
            },

            {
                $group: {
                    _id: "$studentId",

                    name: {
                        $first: "$name"
                    },

                    department: {
                        $first: "$department"
                    },

                    totalMarks: {
                        $sum: "$subjects.marks"
                    },

                    highestMarks: {
                        $max: "$subjects.marks"
                    },

                    lowestMarks: {
                        $min: "$subjects.marks"
                    },

                    averageMarks: {
                        $avg: "$subjects.marks"
                    }
                }
            },

            {
                $project: {
                    _id: 0,

                    name: 1,

                    department: 1,

                    totalMarks: 1,

                    highestMarks: 1,

                    lowestMarks: 1,

                    studentId: "$_id",

                    averageMarks: {
                        $round: ["$averageMarks", 2]
                    }
                }
            },

            {
                $sort: {
                    averageMarks: -1
                }
            }
        ]).toArray();

        // Add index
        const finalResult = result.map((student, index) => ({
            index: index + 1,
            name: student.name,
            department: student.department,
            totalMarks: student.totalMarks,
            highestMarks: student.highestMarks,
            lowestMarks: student.lowestMarks,
            studentId: student.studentId,
            averageMarks: student.averageMarks
        }));

        console.log("\nStudent Grade Summary:");

        console.table(finalResult);

    } catch (error) {
        console.error("Error:", error);

    } finally {
        await client.close();
    }
}

main();