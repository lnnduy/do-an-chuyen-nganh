using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_CauHoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CauHoi",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoiDung = table.Column<string>(nullable: true),
                    NhieuDapAn = table.Column<bool>(nullable: false),
                    DoKho = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CauHoi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DapAn",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NoiDung = table.Column<string>(nullable: true),
                    DapAnDung = table.Column<bool>(nullable: false),
                    IdCauHoi = table.Column<long>(nullable: false),
                    CauHoiId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DapAn", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DapAn_CauHoi_CauHoiId",
                        column: x => x.CauHoiId,
                        principalTable: "CauHoi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DapAn_CauHoiId",
                table: "DapAn",
                column: "CauHoiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DapAn");

            migrationBuilder.DropTable(
                name: "CauHoi");
        }
    }
}
