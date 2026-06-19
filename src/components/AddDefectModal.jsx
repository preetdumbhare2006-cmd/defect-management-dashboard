import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import toast from "react-hot-toast";
import { Bug, Sparkles } from "lucide-react";
export default function AddDefectModal({
  defects,
  editingDefect,
  onClose,
  onSuccess,
  darkMode,
  setNotifications,
}) {
  const [formData, setFormData] = useState(
    editingDefect || {
      title: "",
      assignee: "",
      status: "",
      stage: "",
      environment: "",
      severity: "",
      tag: "",
      source: "",
      defectOwner: "",
      defectRelease: "",
      description: "",
    },
  );
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  const assignees = [...new Set(defects.map((d) => d.assignee))];
  const owners = [...new Set(defects.map((d) => d.defectOwner))];
  const releases = [...new Set(defects.map((d) => d.defectRelease))];

  const normalize = (value) => value?.trim().toLowerCase();

  const statuses = [...new Set(defects.map((d) => normalize(d.status)))];

  const stages = [...new Set(defects.map((d) => normalize(d.stage)))];

  const environments = [
    ...new Set(defects.map((d) => normalize(d.environment))),
  ];

  const severities = [...new Set(defects.map((d) => normalize(d.severity)))];

  const tags = [...new Set(defects.map((d) => normalize(d.tag)))];

  const sources = [...new Set(defects.map((d) => normalize(d.source)))];

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!formData.assignee.trim()) {
      alert("Assignee is required");
      return;
    }

    if (!formData.status) {
      alert("Status is required");
      return;
    }

    try {
      if (editingDefect) {
        await axios.put(
          `http://localhost:5000/api/defects/${editingDefect.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setNotifications((prev) => [
          {
            id: Date.now(),
            title: `Defect #${editingDefect.id} Updated`,
            time: "Just now",
          },
          ...prev,
        ]);
        toast.success("Defect Updated Successfully", {
          icon: "✨",
        });
      } else {
        await axios.post("http://localhost:5000/api/defects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications((prev) => [
          {
            id: Date.now(),
            title: `New Defect Created`,
            time: "Just now",
          },
          ...prev,
        ]);

        toast.success("Defect Added Successfully", {
          icon: "🚀",
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Operation Failed");
    }
  };
  const generateDescription = () => {
    const title = formData.title.toLowerCase();

    let generatedText = "";

    if (title.includes("login")) {
      generatedText = `
Steps To Reproduce:
1. Open Login Page
2. Enter valid credentials
3. Click Login button

Expected Result:
User should login successfully.

Actual Result:
Login process fails and displays an error.
`;
    } else if (title.includes("payment")) {
      generatedText = `
Steps To Reproduce:
1. Open Payment Page
2. Enter payment details
3. Click Pay

Expected Result:
Payment should be completed successfully.

Actual Result:
Transaction fails unexpectedly.
`;
    } else if (title.includes("registration")) {
      generatedText = `
Steps To Reproduce:
1. Open Registration Page
2. Fill user details
3. Click Register

Expected Result:
Account should be created.

Actual Result:
Registration process fails.
`;
    } else if (title.includes("dashboard")) {
      generatedText = `
Steps To Reproduce:
1. Login to application
2. Navigate to Dashboard

Expected Result:
Dashboard should load correctly.

Actual Result:
Dashboard data is not loading properly.
`;
    } else {
      generatedText = `
Steps To Reproduce:
1. Open Application
2. Perform the affected action

Expected Result:
Application should work as expected.

Actual Result:
Unexpected behavior observed.
`;
    }

    setFormData({
      ...formData,
      description: generatedText,
    });

    toast.success("AI Description Generated ✨");
  };
 const inputClass = `
  w-full
  border
  ${
    darkMode
      ? "border-neutral-800 bg-neutral-950 text-white"
      : "border-slate-200 bg-slate-50 text-slate-800"
  }
  px-4
  py-3
  rounded-2xl
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500
  transition-all
  duration-300
`;
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "54px",
      borderRadius: "16px",
      backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
      color: darkMode ? "#ffffff" : "#1e293b",
      borderColor: darkMode ? "#262626" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(99,102,241,0.12)" : "none",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      zIndex: 9999,
    }),

   

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#6366f1"
        : state.isFocused
          ? darkMode
            ? "#262626"
            : "#eef2ff"
          : darkMode
            ? "#0a0a0a"
            : "#ffffff",

      color: state.isSelected ? "#ffffff" : darkMode ? "#ffffff" : "#1e293b",

      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? "#ffffff" : "#1e293b",
      fontWeight: 500,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: darkMode ? "#94a3b8" : "#94a3b8",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6366f1",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`
  ${darkMode ? "bg-black text-white" : "bg-white"}
  p-10
  rounded-[32px]
  w-[95%]
  max-w-5xl
  max-h-[90vh]
  overflow-y-auto
  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
  animate-[fadeIn_.25s_ease]
`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mb-8 border-b pb-5 ${darkMode ? "border-neutral-800" : ""}`}
        >
          <div
            className={`flex items-center justify-between mb-8 border-b pb-6 ${
              darkMode ? "border-neutral-800" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className="
      w-14
      h-14
      rounded-2xl
      bg-gradient-to-r
      from-indigo-500
      to-violet-500
      flex
      items-center
      justify-center
      text-white
      shadow-lg
      "
              >
                <Bug size={28} />
              </div>

              <div>
                <h2
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {editingDefect ? "Edit Defect" : "Add New Defect"}
                </h2>

                <p
                  className={`mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Create and manage defect records
                </p>
              </div>
            </div>

            <Sparkles className="text-violet-500" />
          </div>

          <p className="text-slate-500 mt-2">
            Fill the details below to create or update a defect record.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block mb-2 font-medium">Defect Title</label>
            <input
              className={inputClass}
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Assignee</label>

            <Select
              styles={selectStyles}
              isSearchable
              placeholder="Search Assignee..."
              options={assignees.map((name) => ({
                value: name,
                label: name,
              }))}
              value={
                formData.assignee
                  ? {
                      value: formData.assignee,
                      label: formData.assignee,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  assignee: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Status</label>

            <Select
              styles={selectStyles}
              placeholder="Select Status"
              options={statuses.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.status
                  ? {
                      value: formData.status,
                      label: formData.status,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  status: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Stage</label>

            <Select
              styles={selectStyles}
              placeholder="Select Stage"
              options={stages.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.stage
                  ? {
                      value: formData.stage,
                      label: formData.stage,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  stage: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Environment</label>

            <Select
              styles={selectStyles}
              placeholder="Select Environment"
              options={environments.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.environment
                  ? {
                      value: formData.environment,
                      label: formData.environment,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  environment: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Severity</label>

            <Select
              styles={selectStyles}
              placeholder="Select Severity"
              options={severities.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.severity
                  ? {
                      value: formData.severity,
                      label: formData.severity,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  severity: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tag</label>

            <Select
              styles={selectStyles}
              placeholder="Select Tag"
              options={tags.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.tag
                  ? {
                      value: formData.tag,
                      label: formData.tag,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  tag: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Source</label>

            <Select
              styles={selectStyles}
              placeholder="Select Source"
              options={sources.map((item) => ({
                value: item,
                label: item,
              }))}
              value={
                formData.source
                  ? {
                      value: formData.source,
                      label: formData.source,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  source: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Defect Owner</label>

            <Select
              styles={selectStyles}
              isSearchable
              placeholder="Search Defect Owner..."
              options={owners.map((name) => ({
                value: name,
                label: name,
              }))}
              value={
                formData.defectOwner
                  ? {
                      value: formData.defectOwner,
                      label: formData.defectOwner,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  defectOwner: selected?.value || "",
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Defect Release</label>

            <Select
              styles={selectStyles}
              isSearchable
              placeholder="Search Release..."
              options={releases.map((release) => ({
                value: release,
                label: release,
              }))}
              value={
                formData.defectRelease
                  ? {
                      value: formData.defectRelease,
                      label: formData.defectRelease,
                    }
                  : null
              }
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  defectRelease: selected?.value || "",
                })
              }
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Defect Description</label>

            <button
              onClick={generateDescription}
              className="
      bg-violet-600
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      hover:bg-violet-700
      transition
      "
            >
              ✨ Generate Description
            </button>
          </div>

          <textarea
            rows={10}
            className={inputClass}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className={`
px-6
py-3
rounded-2xl
border
font-medium
transition-all
${
  darkMode
    ? "border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-900"
    : "border-slate-300 hover:bg-slate-50"
}
`}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
px-8
py-3
rounded-2xl
bg-gradient-to-r
from-indigo-600
to-violet-600
text-white
font-semibold
shadow-[0_8px_25px_rgba(99,102,241,0.25)]
hover:shadow-[0_12px_35px_rgba(99,102,241,0.35)]
hover:scale-105
transition-all
duration-300
"
          >
            Save Defect
          </button>
        </div>
      </div>
    </div>
  );
}
