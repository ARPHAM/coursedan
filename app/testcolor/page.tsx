export default function Page() {
  const List_color_test = ["#0a092d", "red"];
  return (
    <div>
      {List_color_test.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
            color: "#fff",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          This is color test: {color}
        </div>
      ))}
    </div>
  );
}
