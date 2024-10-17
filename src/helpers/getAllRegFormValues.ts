export default function getAllRegFormValues() {
  const firstName = document.getElementById("firstName") as HTMLInputElement;
  const lastName = document.getElementById("lastName") as HTMLInputElement;
  const middleName = document.getElementById("middleName") as HTMLInputElement;
  const faculty = document.getElementById("faculty") as HTMLInputElement;
  const department = document.getElementById("department") as HTMLInputElement;
  const level = document.getElementById("level") as HTMLInputElement;
  const matric = document.getElementById("matric") as HTMLInputElement;


  const schoolFessReceiptFile = document.getElementById(
    "schoolFessReceiptFile"
  ) as HTMLInputElement;
  const departmentalDuesReceiptFile = document.getElementById(
    "departmentalDuesReceiptFile"
  ) as HTMLInputElement;
  const facultyDuesReceiptFile = document.getElementById(
    "facultyDuesReceiptFile"
  ) as HTMLInputElement;
  const transcriptFile = document.getElementById(
    "transcriptFile"
  ) as HTMLInputElement;
  const labFeesReceiptFile = document.getElementById(
    "labFeesReceiptFile"
  ) as HTMLInputElement;
  const courseFormFile = document.getElementById(
    "courseFormFile"
  ) as HTMLInputElement;



  if (departmentalDuesReceiptFile) {
    if (
      schoolFessReceiptFile.files !== null &&
      departmentalDuesReceiptFile.files !== null &&
      transcriptFile.files !== null &&
      labFeesReceiptFile.files !== null &&
      courseFormFile.files !== null
    ) {
      return [
        {
          name: "firstName",
          value: firstName.value,
        },
        {
          name: "lastName",
          value: lastName.value,
        },
        {
          name: "middleName",
          value: middleName.value,
        },
        {
          name: "faculty",
          value: faculty.value,
        },
        {
          name: "department",
          value: department.value,
        },
        {
          name: "level",
          value: level.value,
        },
        {
          name: "matric",
          value: matric.value,
        },
        {
          name: "schoolFessReceiptFile",
          value: schoolFessReceiptFile.files[0],
        },
        {
          name: "departmentalDuesReceiptFile",
          value: departmentalDuesReceiptFile.files[0],
        },
        {
          name: "transcriptFile",
          value: transcriptFile.files[0],
        },
        {
          name: "labFeesReceiptFile",
          value: labFeesReceiptFile.files[0],
        },
        {
          name: "courseFormFile",
          value: courseFormFile.files[0],
        },
      ];
    } else {
      return [
        {
          name: "Warning",
          value: "Fill All Fields",
        },
      ];
    }
  }

  if (facultyDuesReceiptFile) {
    if (
      schoolFessReceiptFile.files !== null &&
      facultyDuesReceiptFile.files !== null &&
      labFeesReceiptFile.files !== null &&
      courseFormFile.files !== null
    ) {
      return [
        {
          name: "firstName",
          value: firstName.value,
        },
        {
          name: "lastName",
          value: lastName.value,
        },
        {
          name: "middleName",
          value: middleName.value,
        },
        {
          name: "faculty",
          value: faculty.value,
        },
        {
          name: "department",
          value: department.value,
        },
        {
          name: "level",
          value: level.value,
        },
        {
          name: "matric",
          value: matric.value,
        },
        {
          name: "schoolFessReceiptFile",
          value: schoolFessReceiptFile.files[0],
        },
        {
          name: "facultyDuesReceiptFile",
          value: facultyDuesReceiptFile.files[0],
        },
        {
          name: "labFeesReceiptFile",
          value: labFeesReceiptFile.files[0],
        },
        {
          name: "courseFormFile",
          value: courseFormFile.files[0],
        },
      ];
    } else {
      return [
        {
          name: "Warning",
          value: "Fill All Fields",
        },
      ];
    }
  }
}
