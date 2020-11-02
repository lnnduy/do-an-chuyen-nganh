using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_TaiKhoan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaiKhoan",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    MatKhau = table.Column<string>(nullable: true),
                    HoTen = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    SoDienThoai = table.Column<string>(nullable: true),
                    GioiTinh = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiKhoan", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaiKhoan");
        }
    }
}
