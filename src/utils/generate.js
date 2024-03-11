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
      courses: generateCourses(resultArray, locationName),
      location: generateLocation(resultArray, locationName),
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
    const { class_id, course_id } = getClassId(raw["班級"]);
    return [class_id, raw["班級"], course_id, " ", " ", " ", "SAMPLE-LOC-1"];
  });

  return {
    headers,
    data,
  };
};

const generateCourses = (array, location_name) => {
  const headers = ["course_id", "course_number", "course_name", "location_id"];

  const coursesIds = [
    "Junior-1",
    "Junior-2",
    "Junior-3",
    "Junior-4",
    "Junior-5",
    "Junior-6",
    "Junior-7",
    "Junior-8",
    "Junior-11",
    "Junior-12",
    "Junior-13",
    "Junior-14",
    "Junior-15",
    "Junior-16",
    "Junior-17",
    "Junior-21",
    "Junior-22",
    "Junior-23",
    "Junior-24",
    "Junior-25",
    "Junior-26",
    "Junior-27",
  ];

  const data = coursesIds.map((courseId) => {
    return [courseId, " ", " ", location_name];
  });

  return {
    headers,
    data,
  };
};

const generateLocation = (array, location_name) => {
  const headers = ["location_id", "location_name"];
  const data = [["SAMPLE-LOC-1", location_name]];

  return { headers, data };
};

const generateRosters = (array) => {
  const headers = ["roster_id", "class_id", "student_id"];
  const data = array.map((raw) => {
    const roster_id = "st" + raw["學號"];
    const { class_id } = getClassId(raw["班級"]);
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
    const last_name = raw["姓名"].trim()[0];
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
      return {
        class_id: 101,
        course_id: "Junior-1",
      };
      break;
    case "七年二班":
      return {
        class_id: 102,
        course_id: "Junior-2",
      };
      break;
    case "七年三班":
      return {
        class_id: 103,
        course_id: "Junior-3",
      };
      break;
    case "七年四班":
      return {
        class_id: 104,
        course_id: "Junior-4",
      };
      break;
    case "七年五班":
      return {
        class_id: 105,
        course_id: "Junior-5",
      };
      break;
    case "七年六班":
      return {
        class_id: 106,
        course_id: "Junior-6",
      };
      break;
    case "七年七班":
      return {
        class_id: 107,
        course_id: "Junior-7",
      };
      break;
    case "七年八班":
      return {
        class_id: 108,
        course_id: "Junior-8",
      };
      break;
    case "八年一班":
      return {
        class_id: 201,
        course_id: "Junior-11",
      };
      break;
    case "八年二班":
      return {
        class_id: 202,
        course_id: "Junior-12",
      };
      break;
    case "八年三班":
      return {
        class_id: 203,
        course_id: "Junior-13",
      };
      break;
    case "八年四班":
      return {
        class_id: 204,
        course_id: "Junior-14",
      };
      break;
    case "八年五班":
      return {
        class_id: 205,
        course_id: "Junior-15",
      };
      break;
    case "八年六班":
      return {
        class_id: 206,
        course_id: "Junior-16",
      };
      break;
    case "八年七班":
      return {
        class_id: 207,
        course_id: "Junior-17",
      };
      break;
    case "九年一班":
      return {
        class_id: 301,
        course_id: "Junior-21",
      };
      break;
    case "九年二班":
      return {
        class_id: 302,
        course_id: "Junior-22",
      };
      break;
    case "九年三班":
      return {
        class_id: 303,
        course_id: "Junior-23",
      };
      break;
    case "九年四班":
      return {
        class_id: 304,
        course_id: "Junior-24",
      };
      break;
    case "九年五班":
      return {
        class_id: 305,
        course_id: "Junior-25",
      };
      break;
    case "九年六班":
      return {
        class_id: 306,
        course_id: "Junior-26",
      };
      break;
    case "九年七班":
      return {
        class_id: 307,
        course_id: "Junior-27",
      };
      break;
    default:
      return {
        class_id: 0,
        course_id: " ",
      };
      break;
  }
};
