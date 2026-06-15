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
       );

       toast.success("Defect Updated Successfully", {
         icon: "✨",
       });
     } else {
       await axios.post("http://localhost:5000/api/defects", formData);

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

 const inputClass = `
  w-full
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  rounded-2xl
  focus:outline-none
  focus:ring-2
  focus:ring-indigo-500
  focus:bg-white
  transition-all
  duration-300
`;
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "54px",
    borderRadius: "16px",
    borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(99,102,241,0.12)" : "none",
    transition: "all .2s ease",
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "16px",
    overflow: "hidden",
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    padding: "12px 16px",
    backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
        ? "#eef2ff"
        : "#fff",
    color: state.isSelected ? "#fff" : "#1e293b",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
        ? "#eef2ff"
        : "white",
    color: state.isSelected ? "white" : "#1e293b",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontWeight: 500,
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#94a3b8",
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
        className="
 bg-white
  p-10
  rounded-[32px]
  w-[95%]
  max-w-5xl
  max-h-[90vh]
  overflow-y-auto
  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
  animate-[fadeIn_.25s_ease]
"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 border-b pb-5">
          <div className="flex items-center justify-between mb-8 border-b pb-6">
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
                <h2 className="text-3xl font-bold text-slate-800">
                  {editingDefect ? "Edit Defect" : "Add New Defect"}
                </h2>

                <p className="text-slate-500 mt-1">
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

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="
px-6
py-3
rounded-2xl
border
border-slate-300
font-medium
hover:bg-slate-50
transition-all
"
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
shadow-xl
shadow-indigo-200
hover:scale-105
hover:shadow-2xl
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
