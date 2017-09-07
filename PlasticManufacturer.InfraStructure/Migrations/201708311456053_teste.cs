namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class teste : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ColorMatchRequests", "Mfg", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ColorMatchRequests", "Mfg", c => c.Boolean(nullable: false));
        }
    }
}
