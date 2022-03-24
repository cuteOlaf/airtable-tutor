import { airTableConfig as config } from "./config";
import Airtable from "airtable";

// concatenate ids to make a filter formula
// idList should not be empty
const filter_multiple_ids = (idList) => {
  let filter = "";
  filter += "OR(";
  idList.forEach((id, idx) => {
    if (idx > 0) filter += ", ";
    filter += `RECORD_ID() = '${id}'`;
  });
  filter += ")";
  return filter;
};

const base = new Airtable({
  apiKey: config.AIRTABLE_API_KEY,
}).base(config.ID_BASE);

// authenticate the user and get the class list the user joined.
// returns null if the user does not exist
export const authenticateUser = (userName, onSuccess, onFail, onError) => {
  const formula = `{Name} = '${userName}'`;
  base(config.ID_TABLE_STUDENTS)
    .select({
      fields: [config.ID_STUDENTS_NAME, config.ID_STUDENTS_CLASSES],
      filterByFormula: formula,
      pageSize: 1,
    })
    .eachPage(
      function page(records) {
        if (records.length === 0) onFail();
        records.forEach(function (record) {
          const classes = record.get("Classes");
          onSuccess(classes);
          return;
        });
      },
      function done(err) {
        if (err && onError !== null) onError(err);
      }
    );
};

export const getClassList = (idList, onSuccess, onError) => {
  if (idList.length === 0) return "";
  base(config.ID_TABLE_CLASSES)
    .select({
      fields: [config.ID_CLASSES_NAME, config.ID_CLASSES_STUDENTS],
      filterByFormula: filter_multiple_ids(idList),
      pageSize: idList.length,
    })
    .eachPage(
      function page(records) {
        let nameList = new Set();
        let classInfo = [];

        records.forEach((record) => {
          const names = record.get("Students");
          names.forEach((name) => {
            nameList.add(name);
          });
          const class_name = record.get("Name");
          classInfo.push({ name: class_name, students: names });
        });
        nameList = Array.from(nameList);
        base(config.ID_TABLE_STUDENTS)
          .select({
            fields: [config.ID_STUDENTS_NAME],
            filterByFormula: filter_multiple_ids(nameList),
            pageSize: nameList.length,
          })
          .eachPage(
            function page(records) {
              let idNameMapping = {};
              records.forEach((record) => {
                const id = record.getId();
                const name = record.get("Name");
                idNameMapping[id] = name;
              });
              classInfo.map((item) => {
                let students = item.students;
                students.forEach(
                  (id, idx) => (students[idx] = idNameMapping[id])
                );
                return { name: item.name, students };
              });

              onSuccess(classInfo);
            },
            function done(err) {
              if (err) {
                console.error(err);
                onError();
              }
            }
          );
      },
      function done(err) {
        if (err) {
          console.error(err);
          onError();
        }
      }
    );
};
