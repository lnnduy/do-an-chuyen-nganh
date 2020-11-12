using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class EditTableName_KhoCauHoiContext_KhoCauHoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KhoCauHoiContext",
                table: "KhoCauHoiContext");

            migrationBuilder.RenameTable(
                name: "KhoCauHoiContext",
                newName: "KhoCauHoi");

            migrationBuilder.RenameIndex(
                name: "IX_KhoCauHoiContext_IdHocPhan",
                table: "KhoCauHoi",
                newName: "IX_KhoCauHoi_IdHocPhan");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhoCauHoi",
                table: "KhoCauHoi",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KhoCauHoi",
                table: "KhoCauHoi");

            migrationBuilder.RenameTable(
                name: "KhoCauHoi",
                newName: "KhoCauHoiContext");

            migrationBuilder.RenameIndex(
                name: "IX_KhoCauHoi_IdHocPhan",
                table: "KhoCauHoiContext",
                newName: "IX_KhoCauHoiContext_IdHocPhan");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhoCauHoiContext",
                table: "KhoCauHoiContext",
                column: "Id");
        }
    }
}
