import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/client";

export const StudentInfoContext = createContext();

export const useStudentInfo = () => {
  const context = useContext(StudentInfoContext);
  if (!context) {
    throw new Error(
      "useStudentInfo must be used within StudentInfoContextProvider"
    );
  }
  return context;
};

export const StudentInfoContextProvider = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getStudentInfo = async () => {
    setLoading(true);
    const user = await supabase.auth.getUser();

    let { data, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", user.data.user.id);

    if (error) throw new Error(error);
    setStudentInfo(data.length > 0 ? data[0] : {});
    setLoading(false);
  };

  const updateStudentInfo = async ({ cohort, grade, number, github }) => {
    try {
      const user = await supabase.auth.getUser();

      const { error } = await supabase.from("user_info").upsert({
        user_id: user.data.user.id,
        github: github,
        cohort: cohort,
        grade: grade,
        number: number,
      });
      if (error) throw error;
      setStudentInfo({
        ...studentInfo,
        github: github,
        cohort: cohort,
        grade: grade,
        number: number,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StudentInfoContext.Provider
      value={{ studentInfo, getStudentInfo, updateStudentInfo, loading }}
    >
      {children}
    </StudentInfoContext.Provider>
  );
};
