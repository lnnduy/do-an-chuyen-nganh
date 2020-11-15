using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_DeThi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeThi",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDeThi = table.Column<string>(nullable: true),
                    DeThiThu = table.Column<bool>(nullable: false),
                    SanSang = table.Column<bool>(nullable: false),
                    IdHocPhan = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeThi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HocPhan_DeThi",
                        column: x => x.IdHocPhan,
                        principalTable: "HocPhan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietDeThi",
                columns: table => new
                {
                    IdDeThi = table.Column<long>(nullable: false),
                    IdCauHoi = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDeThi", x => new { x.IdDeThi, x.IdCauHoi });
                    table.ForeignKey(
                        name: "FK_CauHoi_ChiTietDeThi",
                        column: x => x.IdCauHoi,
                        principalTable: "CauHoi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DeThi_ChiTietDeThi",
                        column: x => x.IdDeThi,
                        principalTable: "DeThi",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDeThi_IdCauHoi",
                table: "ChiTietDeThi",
                column: "IdCauHoi");

            migrationBuilder.CreateIndex(
                name: "IX_DeThi_IdHocPhan",
                table: "DeThi",
                column: "IdHocPhan");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietDeThi");

            migrationBuilder.DropTable(
                name: "DeThi");
        }
    }
}
