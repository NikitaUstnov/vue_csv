import { read, utils } from "xlsx";

export const generate = async (file, locationName = "") => {
  if (!file) {
    return {
      error: true,
      message: "File not provided",
    };
  }

  const resultArray = await xlsxToArray(file);

  if (!resultArray.length) {
    return {
      error: true,
      message: "Empty file",
    };
  }

  const acceptedHeaders = ["班級", "姓名", "學號"];
  const headers = Object.keys(resultArray[0]);

  if (
    acceptedHeaders[0] !== headers[0] &&
    acceptedHeaders[1] !== headers[1] &&
    acceptedHeaders[2] !== headers[2]
  ) {
    return {
      error: true,
      message: `Invalid headers. Expected '班級', '姓名', '學號', got ${headers.join(
        ", "
      )}`,
    };
  }

  return {
    error: false,
    data: {
      classes: generateClasses(resultArray),
      courses: generateCourses(resultArray),
      location: generateLocation(resultArray),
      rosters: generateRosters(resultArray),
      staff: generateStaff(resultArray),
      students: generateStudents(resultArray),
    },
  };
};

const generateClasses = (array) => {
  const headers = [
    "class_id",
    "class_number",
    "course_id",
    "instructor_id",
    "instructor_id_2",
    "instructor_id_3",
    "location_id",
  ];

  const data = array.map((raw) => {
    const class_id = getClassId(raw["班級"]);
    return [class_id, raw["班級"], " ", " ", " ", " ", "SAMPLE-LOC-1"];
  });

  return {
    headers,
    data,
  };
};

const generateCourses = (array) => {
  const headers = ["course_id", "course_number", "course_name", "location_id"];

  const data = [[" ", " ", " ", " "]];

  return {
    headers,
    data,
  };
};

const generateLocation = (array) => {
  const headers = ["location_id", "location_name"];
  const data = [["SAMPLE-LOC-1", "ctjhs"]];

  return { headers, data };
};

const generateRosters = (array) => {
  const headers = ["roster_id", "class_id", "student_id"];
  const data = array.map((raw) => {
    const roster_id = "st" + raw["學號"];
    const class_id = getClassId(raw["班級"]);
    const student_id = "student" + raw["學號"];
    return [roster_id, class_id, student_id];
  });

  return { headers, data };
};

const generateStaff = (array) => {
  const headers = [
    "person_id",
    "person_number",
    "first_name",
    "middle_name",
    "last_name",
    "email_address",
    "sis_username",
    "location_id",
  ];

  const data = [
    [
      "SAMPLE-EMPLOYEE-0001",
      "E-0001",
      "Natalie",
      " ",
      "Carr",
      "NCarr@example.org",
      "NCarr",
      "SAMPLE-LOC-1",
    ],
  ];

  return { headers, data };
};

const generateStudents = (array) => {
  const headers = [
    "person_id",
    "person_number",
    "first_name",
    "middle_name",
    "last_name",
    "grade_level",
    "email_address",
    "sis_username",
    "password_policy",
    "location_id",
  ];

  const data = array.map((raw) => {
    const person_id = "student" + raw["學號"];
    const person_number = raw["學號"];
    const last_name = raw["姓名"].trim().at(-1);
    const first_name = raw["姓名"].trim().replace(last_name, "");

    return [
      person_id,
      person_number,
      first_name,
      " ",
      last_name,
      " ",
      " ",
      " ",
      4,
      "SAMPLE-LOC-1",
    ];
  });

  return { headers, data };
};

const xlsxToArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = this.result,
        array = new Uint8Array(arrayBuffer),
        binaryString = String.fromCharCode.apply(null, array);

      const workbook = read(binaryString, {
        type: "binary",
      });

      const first_sheet_name = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[first_sheet_name];

      const result = utils.sheet_to_json(worksheet, {
        raw: true,
      });

      return resolve(result);
    };
    reader.readAsArrayBuffer(file);
  });
};

const getClassId = (classNumber) => {
  switch (classNumber) {
    case "七年一班":
      return 101;
      break;
    case "七年二班":
      return 102;
      break;
    case "七年三班":
      return 103;
      break;
    case "七年四班":
      return 104;
      break;
    case "七年五班":
      return 105;
      break;
    case "七年六班":
      return 106;
      break;
    case "七年七班":
      return 107;
      break;
    case "七年八班":
      return 108;
      break;
    case "八年一班":
      return 201;
      break;
    case "八年二班":
      return 202;
      break;
    case "八年三班":
      return 203;
      break;
    case "八年四班":
      return 204;
      break;
    case "八年五班":
      return 205;
      break;
    case "八年六班":
      return 206;
      break;
    case "八年七班":
      return 207;
      break;
    case "九年一班":
      return 301;
      break;
    case "九年二班":
      return 302;
      break;
    case "九年三班":
      return 303;
      break;
    case "九年四班":
      return 304;
      break;
    case "九年五班":
      return 305;
      break;
    case "九年六班":
      return 306;
      break;
    case "九年七班":
      return 307;
      break;
    default:
      return 0;
      break;
  }
};
