using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_BaiLam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaiLam",
                columns: table => new
                {
                    IdCaThi = table.Column<long>(nullable: false),
                    IdSinhVien = table.Column<long>(nullable: false),
                    IdCauHoi = table.Column<long>(nullable: false),
                    IdDapAn = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaiLam", x => new { x.IdCaThi, x.IdSinhVien, x.IdCauHoi, x.IdDapAn });
                    table.ForeignKey(
                        name: "FK_CaThi_BaiLam",
                        column: x => x.IdCaThi,
                        principalTable: "CaThi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CauHoi_BaiLam",
                        column: x => x.IdCauHoi,
                        principalTable: "CauHoi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DapAn_BaiLam",
                        column: x => x.IdDapAn,
                        principalTable: "DapAn",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SinhVien_BaiLam",
                        column: x => x.IdSinhVien,
                        principalTable: "SinhVien",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaiLam_IdCauHoi",
                table: "BaiLam",
                column: "IdCauHoi");

            migrationBuilder.CreateIndex(
                name: "IX_BaiLam_IdDapAn",
                table: "BaiLam",
                column: "IdDapAn");

            migrationBuilder.CreateIndex(
                name: "IX_BaiLam_IdSinhVien",
                table: "BaiLam",
                column: "IdSinhVien");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaiLam");
        }
    }
}
