using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class RawMaterialsController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: RawMaterials
        public async Task<ActionResult> Index()
        {

            return View(await db.RawMateials.ToListAsync());
        }

        private void FillCategory()
        {
            IEnumerable<Category> categoriaList = db.Categories.ToList();
            ViewBag.CategoryList = new SelectList (
                                 categoriaList,
                                 "Id",
                                "Name"              );
        }

        // GET: RawMaterials/Create
        public ActionResult Create()
        {
            FillCategory();
            return View();
        }

        // POST: RawMaterials/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Code,Notes,ChemicalName,Status,Category,MainSupplier,MainCustomer,HeatStability,LightSatability,Fda,Hbfb,QCRequired,BarCode,Name,Description,CreationDate,LastUpdate")] RawMaterial rawMaterial)
        {
            if (ModelState.IsValid)
            {
                rawMaterial.CreationDate = DateTime.UtcNow;
                rawMaterial.LastUpdate = DateTime.UtcNow;

                Category category = await db.Categories.FindAsync(rawMaterial.Category.Id);
                if (category != null)
                {
                    rawMaterial.Category = category;
                }

                    db.RawMateials.Add(rawMaterial);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(rawMaterial);
        }

        // GET: RawMaterials/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RawMaterial rawMaterial = await db.RawMateials.FindAsync(id);
            if (rawMaterial == null)
            {
                return HttpNotFound();
            }
            return View(rawMaterial);
        }

        // POST: RawMaterials/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Code,Notes,ChemicalName,Status,Category,MainSupplier,MainCustomer,HeatStability,LightSatability,Fda,Hbfb,QCRequired,BarCode,Name,Description,CreationDate,LastUpdate")] RawMaterial rawMaterial)
        {
            if (ModelState.IsValid)
            {
                rawMaterial.LastUpdate = DateTime.UtcNow;

                db.Entry(rawMaterial).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(rawMaterial);
        }

        // GET: RawMaterials/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RawMaterial rawMaterial = await db.RawMateials.FindAsync(id);
            if (rawMaterial == null)
            {
                return HttpNotFound();
            }
            return View(rawMaterial);
        }

        // POST: RawMaterials/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            RawMaterial rawMaterial = await db.RawMateials.FindAsync(id);
            db.RawMateials.Remove(rawMaterial);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
