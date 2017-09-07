using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class PackagingsController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: Packagings
        public async Task<ActionResult> Index()
        {
            return View(await db.Packages.ToListAsync());
        }

        // GET: Packagings/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Packaging packaging = await db.Packages.FindAsync(id);
            if (packaging == null)
            {
                return HttpNotFound();
            }
            return View(packaging);
        }

        // GET: Packagings/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Packagings/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Packaging packaging)
        {
            if (ModelState.IsValid)
            {
                db.Packages.Add(packaging);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(packaging);
        }

        // GET: Packagings/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Packaging packaging = await db.Packages.FindAsync(id);
            if (packaging == null)
            {
                return HttpNotFound();
            }
            return View(packaging);
        }

        // POST: Packagings/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Packaging packaging)
        {
            if (ModelState.IsValid)
            {
                db.Entry(packaging).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(packaging);
        }

        // GET: Packagings/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Packaging packaging = await db.Packages.FindAsync(id);
            if (packaging == null)
            {
                return HttpNotFound();
            }
            return View(packaging);
        }

        // POST: Packagings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Packaging packaging = await db.Packages.FindAsync(id);
            db.Packages.Remove(packaging);
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
