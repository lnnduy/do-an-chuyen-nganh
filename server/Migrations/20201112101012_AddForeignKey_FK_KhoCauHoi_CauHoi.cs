using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddForeignKey_FK_KhoCauHoi_CauHoi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "IdKhoCauHoi",
                table: "CauHoi",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_CauHoi_IdKhoCauHoi",
                table: "CauHoi",
                column: "IdKhoCauHoi");

            migrationBuilder.AddForeignKey(
                name: "FK_KhoCauHoi_CauHoi",
                table: "CauHoi",
                column: "IdKhoCauHoi",
                principalTable: "KhoCauHoi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhoCauHoi_CauHoi",
                table: "CauHoi");

            migrationBuilder.DropIndex(
                name: "IX_CauHoi_IdKhoCauHoi",
                table: "CauHoi");

            migrationBuilder.DropColumn(
                name: "IdKhoCauHoi",
                table: "CauHoi");
        }
    }
}
