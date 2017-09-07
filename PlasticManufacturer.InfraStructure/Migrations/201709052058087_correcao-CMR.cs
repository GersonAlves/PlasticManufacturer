namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcaoCMR : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ColorMatchRequests", "Hour", c => c.DateTime());
            AlterColumn("dbo.ColorMatchRequests", "CustomerDueDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ColorMatchRequests", "CustomerDueDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.ColorMatchRequests", "Hour", c => c.DateTime(nullable: false));
        }
    }
}
