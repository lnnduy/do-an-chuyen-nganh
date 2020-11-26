using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_ThiSinh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ThiSinh",
                columns: table => new
                {
                    IdSinhVien = table.Column<long>(nullable: false),
                    IdCaThi = table.Column<long>(nullable: false),
                    SoLanDangNhap = table.Column<int>(nullable: false),
                    TenMay = table.Column<string>(nullable: true),
                    DiaChiIp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThiSinh", x => new { x.IdSinhVien, x.IdCaThi });
                    table.ForeignKey(
                        name: "FK_CaThi_ThiSinh",
                        column: x => x.IdCaThi,
                        principalTable: "CaThi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SinhVien_ThiSinh",
                        column: x => x.IdSinhVien,
                        principalTable: "SinhVien",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ThiSinh_IdCaThi",
                table: "ThiSinh",
                column: "IdCaThi");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ThiSinh");
        }
    }
}
