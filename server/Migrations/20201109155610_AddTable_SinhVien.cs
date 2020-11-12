using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
  public partial class AddTable_SinhVien : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "SinhVien",
          columns: table => new
          {
            Id = table.Column<long>(nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            MSSV = table.Column<string>(nullable: true),
            HoTen = table.Column<string>(nullable: true),
            GioiTinh = table.Column<string>(nullable: true),
            SoDienThoai = table.Column<string>(nullable: true),
            Email = table.Column<string>(nullable: true),
            DiaChi = table.Column<string>(nullable: true),
            IdLopHoc = table.Column<long>(nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_SinhVien", x => x.Id);
            table.ForeignKey(
                      name: "FK_LopHoc_SinhVien",
                      column: x => x.IdLopHoc,
                      principalTable: "LopHoc",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          });

      migrationBuilder.CreateIndex(
          name: "IX_SinhVien_IdLopHoc",
          table: "SinhVien",
          column: "IdLopHoc");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "LopHoc");
    }
  }
}
