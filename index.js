// Your code here
// Function to create a single employee record
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event for an employee
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  
  // Function to create a time-out event for an employee
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // Convert hours into decimal format
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages earned by an employee
  function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    return allDates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
  // Example usage:
  
  // Creating employee records
  const employees = createEmployeeRecords([
    ["John", "Doe", "Engineer", 30],
    ["Jane", "Smith", "Manager", 50]
  ]);
  
  // Adding time-in and time-out events
  createTimeInEvent(employees[0], "2024-12-22 0900");
  createTimeOutEvent(employees[0], "2024-12-22 1700");
  
  createTimeInEvent(employees[1], "2024-12-22 0800");
  createTimeOutEvent(employees[1], "2024-12-22 1600");
  
  // Calculating and logging individual wages
  console.log(allWagesFor(employees[0])); // Outputs wages for John Doe
  console.log(allWagesFor(employees[1])); // Outputs wages for Jane Smith
  
  // Calculating and logging total payroll
  console.log(calculatePayroll(employees)); // Outputs total payroll for all employees
  