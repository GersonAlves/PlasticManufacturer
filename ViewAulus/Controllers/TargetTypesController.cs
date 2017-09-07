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
    public class TargetTypesController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: TargetTypes
        public async Task<ActionResult> Index()
        {
            return View(await db.TargetTypes.ToListAsync());
        }

        // GET: TargetTypes/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            if (targetType == null)
            {
                return HttpNotFound();
            }
            return View(targetType);
        }

        // GET: TargetTypes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TargetTypes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] TargetType targetType)
        {
            if (ModelState.IsValid)
            {
                db.TargetTypes.Add(targetType);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(targetType);
        }

        // GET: TargetTypes/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            if (targetType == null)
            {
                return HttpNotFound();
            }
            return View(targetType);
        }

        // POST: TargetTypes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] TargetType targetType)
        {
            if (ModelState.IsValid)
            {
                db.Entry(targetType).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(targetType);
        }

        // GET: TargetTypes/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            if (targetType == null)
            {
                return HttpNotFound();
            }
            return View(targetType);
        }

        // POST: TargetTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            db.TargetTypes.Remove(targetType);
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
