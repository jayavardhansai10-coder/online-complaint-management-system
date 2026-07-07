import React from "react";

const colorMap = {
  primary: {
    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
  },
  success: {
    background: "linear-gradient(135deg, #10B981, #059669)",
  },
  warning: {
    background: "linear-gradient(135deg, #F59E0B, #D97706)",
  },
  danger: {
    background: "linear-gradient(135deg, #EF4444, #DC2626)",
  },
  info: {
    background: "linear-gradient(135deg, #06B6D4, #0891B2)",
  },
};

function DashboardCard({ title, value, icon, color }) {
  const style = colorMap[color] || colorMap.primary;

  return (
    <div
      className="card border-0 h-100"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        transition: "0.35s ease",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,.08)";
      }}
    >
      <div
        style={{
          ...style,
          color: "#fff",
          padding: "24px",
          minHeight: "170px",
          position: "relative",
        }}
      >
        <div className="d-flex justify-content-between align-items-start">

          <div>
            <div
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                opacity: 0.9,
                fontWeight: 600,
              }}
            >
              {title}
            </div>

            <h1
              style={{
                marginTop: "18px",
                fontSize: "46px",
                fontWeight: 700,
              }}
            >
              {value}
            </h1>

            <small style={{ opacity: 0.9 }}>
              Updated just now
            </small>
          </div>

          <div
            style={{
              fontSize: "72px",
              opacity: 0.18,
            }}
          >
            {icon}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard;