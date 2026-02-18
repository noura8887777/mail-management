@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Détails du Statut : {{ $listCourrierStatut->nom_statut }}</h3>
        <div class="card-tools">
            <a href="{{ route('statut.index') }}" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Retour
            </a>
            <a href="{{ route('statut.edit', $listCourrierStatut->id) }}" class="btn btn-warning">
                <i class="fas fa-edit"></i> Modifier
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

        <div class="row mb-4">
            <div class="col-md-6">
                <h5>Informations du Statut</h5>
                <table class="table table-bordered">
                    <tr>
                        <th width="200">ID</th>
                        <td>{{ $listCourrierStatut->id }}</td>
                    </tr>
                    <tr>
                        <th>Nom du Statut</th>
                        <td>{{ $listCourrierStatut->nom_statut }}</td>
                    </tr>
                    <tr>
                        <th>Nombre de Courriers</th>
                        <td>{{ $listCourrierStatut->courriers->count() }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <h5>Liste des Courriers avec ce Statut</h5>
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numéro d'ordre</th>
                        <th>Date</th>
                        <th>Numéro de lettre</th>
                        <th>Destinataire</th>
                        <th>Analyse</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($listCourrierStatut->courriers as $courrier)
                        <tr>
                            <td>{{ $courrier->id }}</td>
                            <td>{{ $courrier->num_order_annuel }}</td>
                            <td>{{ $courrier->date }}</td>
                            <td>{{ $courrier->num_lettre }}</td>
                            <td>{{ $courrier->designation_destinataire }}</td>
                            <td>{{ Str::limit($courrier->analyse_affaire, 50) }}</td>
                            <td>
                                <a href="{{ route('courrier.show', $courrier->id) }}" class="btn btn-sm btn-info">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a href="{{ route('courrier.edit', $courrier->id) }}" class="btn btn-sm btn-warning">
                                    <i class="fas fa-edit"></i>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center">Aucun courrier trouvé avec ce statut</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
