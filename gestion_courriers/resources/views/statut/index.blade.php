@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Liste des Statuts</h3>
        <div class="card-tools">
            <a href="{{ route('statut.create') }}" class="btn btn-primary">
                <i class="fas fa-plus"></i> Nouveau Statut
            </a>
        </div>
    </div>
    <div class="card-body">
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom du Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($statuts as $statut)
                    <tr>
                        <td>{{ $statut->id }}</td>
                        <td>{{ $statut->nom_statut }}</td>
                        <td>
                            <a href="{{ route('statut.show', $statut->id) }}" class="btn btn-sm btn-info">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="{{ route('statut.edit', $statut->id) }}" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i>
                            </a>
                            <form action="{{ route('statut.destroy', $statut->id) }}" method="POST" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce statut ?')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        
        <div class="mt-3">
            {{ $statuts->links() }}
        </div>
    </div>
</div>
@endsection 