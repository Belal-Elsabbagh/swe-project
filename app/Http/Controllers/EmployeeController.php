<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Skill;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Employee::class);
    }

    private string $resource_route = 'employees';

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        $employees = EmployeeResource::collection(Employee::all()->sortBy('total_utilization', SORT_NATURAL, true));
        return Inertia::render("$this->resource_route/index", [
            'employees' => $employees,
            'skills' => Skill::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render("$this->resource_route/create", ['skills' => Skill::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreEmployeeRequest $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = new Employee([
            'first_name' => $request->input('firstName'),
            'last_name' => $request->input('lastName'),
            'email' => $request->input('email'),
        ]);
        $employee->save();
        $employee->skills()->attach($request->input('skills', []));
        return Redirect::route("$this->resource_route.index");
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Employee $employee
     *
     * @return \Inertia\Response
     */
    public function show(Employee $employee): \Inertia\Response
    {
        return Inertia::render("$this->resource_route/show", ['employee' => new EmployeeResource($employee)]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Employee $employee
     *
     * @return \Inertia\Response
     */
    public function edit(Employee $employee): \Inertia\Response
    {
        return Inertia::render("$this->resource_route/edit", [
            'employee' => new EmployeeResource($employee),
            'skills' => Skill::all()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateEmployeeRequest $request
     * @param \App\Models\Employee $employee
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        return Redirect::route("$this->resource_route.show", [$employee]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Employee $employee
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return Redirect::route("$this->resource_route.index");
    }
}
