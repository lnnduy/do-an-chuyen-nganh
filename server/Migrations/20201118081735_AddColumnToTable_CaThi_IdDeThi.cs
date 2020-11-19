using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddColumnToTable_CaThi_IdDeThi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "IdDeThi",
                table: "CaThi",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_CaThi_IdDeThi",
                table: "CaThi",
                column: "IdDeThi");

            migrationBuilder.AddForeignKey(
                name: "FK_DeThi_CaThi",
                table: "CaThi",
                column: "IdDeThi",
                principalTable: "DeThi",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeThi_CaThi",
                table: "CaThi");

            migrationBuilder.DropIndex(
                name: "IX_CaThi_IdDeThi",
                table: "CaThi");

            migrationBuilder.DropColumn(
                name: "IdDeThi",
                table: "CaThi");
        }
    }
}
