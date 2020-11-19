using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_CaThi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CaThi",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenCaThi = table.Column<string>(nullable: true),
                    ThoiGianBatDau = table.Column<long>(nullable: false),
                    ThoiGianThi = table.Column<long>(nullable: false),
                    IdHocPhan = table.Column<long>(nullable: false),
                    IdLopHoc = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaThi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HocPhan_CaThi",
                        column: x => x.IdHocPhan,
                        principalTable: "HocPhan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LopHoc_CaThi",
                        column: x => x.IdLopHoc,
                        principalTable: "LopHoc",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CaThi_IdHocPhan",
                table: "CaThi",
                column: "IdHocPhan");

            migrationBuilder.CreateIndex(
                name: "IX_CaThi_IdLopHoc",
                table: "CaThi",
                column: "IdLopHoc");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CaThi");
        }
    }
}
