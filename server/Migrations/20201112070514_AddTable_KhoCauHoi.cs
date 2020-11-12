using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddTable_KhoCauHoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KhoCauHoiContext",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoCauHoi = table.Column<string>(nullable: true),
                    MoTa = table.Column<string>(nullable: true),
                    IdHocPhan = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoCauHoiContext", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HocPhan_KhoCauHoi",
                        column: x => x.IdHocPhan,
                        principalTable: "HocPhan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KhoCauHoiContext_IdHocPhan",
                table: "KhoCauHoiContext",
                column: "IdHocPhan");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KhoCauHoiContext");
        }
    }
}
