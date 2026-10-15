const { MongoClient } = require("mongodb");
const XLSX = require("xlsx");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "studentDB";
const collectionName = "attendance";

const filePath = "D:\\student-grade-mongodb\\student.xlsx";

async function main() {
    try {
        // Read Excel file
        const workbook = XLSX.readFile(filePath);

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, {
            header: 1
        });

        console.log("Excel data read successfully!");
        console.log(`Total rows in Excel: ${rows.length}`);

        // Convert Excel data into objects
        const students = rows.slice(1).map(row => ({
            Rollno: Number(row[0]),
            Name: row[1],
            Attendance: Number(row[2]),
            Marks: Number(row[3])
        }));

        console.log("\nExcel students:");
        console.table(students);

        // Connect to MongoDB
        await client.connect();

        console.log("\nConnected to MongoDB!");

        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        // Delete old records
        await collection.deleteMany({});

        console.log("Old attendance data cleared.");

        // Insert Excel data
        if (students.length > 0) {
            await collection.insertMany(students);

            console.log("Excel data uploaded to MongoDB!");
        }

        // Find students with attendance below 80%
        const lowAttendance = await collection.find({
            Attendance: {
                $lt: 80
            }
        }).toArray();

        console.log("\n======================================");
        console.log("STUDENTS WITH ATTENDANCE BELOW 80%");
        console.log("======================================");

        if (lowAttendance.length === 0) {
            console.log("No students have attendance below 80%.");
        } else {

            lowAttendance.forEach(student => {

                console.log(`Roll No: ${student.Rollno}`);
                console.log(`Name: ${student.Name}`);
                console.log(`Attendance: ${student.Attendance}%`);
                console.log(`Marks: ${student.Marks}`);

                console.log("--------------------------------------");
            });

            console.log(
                `Total students below 80%: ${lowAttendance.length}`
            );
        }

    } catch (error) {

        console.error("\nError:");
        console.error(error);

    } finally {

        await client.close();
    }
}

main();