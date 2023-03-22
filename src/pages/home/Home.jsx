import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/client";
import Logo from "../../assets/roclogo.png";
import Loading from "react-fullscreen-loading";

import "./home.css";
import { useStudentInfo } from "../../context/StudentInfoContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Home = () => {
  const navigate = useNavigate();
  const { studentInfo, getStudentInfo, updateStudentInfo, loading } =
    useStudentInfo();

  useEffect(() => {
    getStudentInfo();
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        navigate("/login");
      }
    };
    getSession();
  }, [navigate]);

  const renderForm = () => {
    if (loading) {
      return (
        <Loading loading={true} background="#EEEDED" loaderColor="#FF7B00" />
      );
    } else {
      return (
        <div id="dashboardContainer">
          {/* <h2>
            Hello {studentInfo.given_name} {userInfo.family_name}!
          </h2> */}
          <p>Almost ready, We only need your account info.</p>
          <div className="form">
            <h3>Setup Account Info</h3>
            <Formik
              initialValues={{
                cohort: studentInfo.cohort || "2",
                grade: studentInfo.grade || "A",
                number: studentInfo.number || "",
                github: studentInfo.github || "",
              }}
              validationSchema={studentInfoSchema}
              onSubmit={(values, actions) => {
                updateStudentInfo(values);
                alert("Registration complete! Logging you out.");
                supabase.auth.signOut();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="inputContainer">
                    <label>Cohort</label>
                    <Field as="select" name="cohort">
                      <option value="2">2 </option>
                      <option value="1">1 </option>
                      <option value="0">0 </option>
                      <option value="9">9 </option>
                      <option value="8">8 </option>
                    </Field>
                    {errors.cohort && touched.cohort ? (
                      <div>{errors.cohort}</div>
                    ) : null}
                  </div>
                  <div className="inputContainer">
                    <label>Klas</label>
                    <Field as="select" name="grade">
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </Field>
                    {errors.grade && touched.grade ? (
                      <div>{errors.grade}</div>
                    ) : null}
                  </div>
                  <div className="inputContainer">
                    <label>Pasnummer</label>
                    <Field name="number" as="input" />
                    {errors.number && touched.number ? (
                      <div>{errors.number}</div>
                    ) : null}
                  </div>

                  <div className="inputContainer">
                    <label>Github</label>
                    <Field name="github" as="input" />
                    {errors.github && touched.github ? (
                      <div>{errors.github}</div>
                    ) : null}
                  </div>
                  <div className="inputContainer">
                    <button type="submit">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <button
            className="logOutButton"
            onClick={() => supabase.auth.signOut()}
          >
            Logout
          </button>
          <img width={200} src={Logo} />
        </div>
      );
    }
  };

  const studentInfoSchema = Yup.object().shape({
    cohort: Yup.number(),
    grade: Yup.string(),
    number: Yup.string(),
    github: Yup.string(),
  });

  return renderForm();
};

export default Home;
